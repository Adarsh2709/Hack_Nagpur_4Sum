"""HMM + One-Class SVM pipeline for 16-int biometric windows.

API:
- process(enrollment: np.ndarray (10,16), candidate: np.ndarray (16,)) -> dict

The pipeline:
1. Fit a GaussianHMM on the enrollment (10,16).
2. Compute a confidence for the candidate using the HMM score -> sigmoid normalization.
3. If confidence > 0.65, fit a OneClassSVM profile on enrollment and save it to disk.
4. Use OneClassSVM decision_function on candidate and return final confidence.
"""
from __future__ import annotations

import os
import json
import time
from typing import Dict, Optional

import numpy as np
from hmmlearn.hmm import GaussianHMM
from sklearn.svm import OneClassSVM
from joblib import dump
from math import exp


def sigmoid(x: float) -> float:
    if x >= 0:
        z = exp(-x)
        return 1.0 / (1.0 + z)
    else:
        z = exp(x)
        return z / (1.0 + z)


class BiometricPipeline:
    def __init__(self, n_components: int = 4, random_state: int = 42):
        self.n_components = n_components
        self.random_state = random_state
        self.hmm: Optional[GaussianHMM] = None

    def train_hmm(self, enrollment: np.ndarray) -> None:
        if enrollment.ndim != 2 or enrollment.shape[1] != 16:
            raise ValueError("enrollment must be shape (n_steps, 16)")
        # Fit a GaussianHMM on the time series of 16-d vectors.
        model = GaussianHMM(n_components=self.n_components, covariance_type="full", n_iter=200, random_state=self.random_state)
        model.fit(enrollment)
        self.hmm = model

    def hmm_confidence(self, candidate: np.ndarray, enrollment: Optional[np.ndarray] = None, temperature: float = 1.0) -> float:
        if self.hmm is None:
            raise RuntimeError("HMM not trained")
        if candidate.shape != (16,):
            raise ValueError("candidate must be shape (16,)")
        # Score the single candidate (as a 1-step sequence).
        logL_candidate = self.hmm.score(candidate.reshape(1, -1))

        # Use enrollment if provided to compute a baseline mean log-likelihood
        if enrollment is not None:
            # Compute mean log likelihood of enrollment steps under model to get a reference point
            enrollment_scores = [self.hmm.score(enrollment[i:i+1]) for i in range(len(enrollment))]
            mean_logL = float(np.mean(enrollment_scores))
        else:
            mean_logL = 0.0

        # Map difference to probability using sigmoid
        diff = (logL_candidate - mean_logL) / max(temperature, 1e-6)
        p = sigmoid(diff)
        return float(p)

    def make_profile_and_save(self, enrollment: np.ndarray, base_dir: str = "profiles") -> str:
        # Create a One-Class SVM profile for the enrollment data
        os.makedirs(base_dir, exist_ok=True)
        stamp = str(int(time.time()))
        profile_dir = os.path.join(base_dir, stamp)
        os.makedirs(profile_dir, exist_ok=False)

        ocsvm = OneClassSVM(kernel="rbf", gamma='scale', nu=0.2)
        ocsvm.fit(enrollment)

        path = os.path.join(profile_dir, "profile.joblib")
        dump(ocsvm, path)

        # Save some metadata
        metadata = {
            "created_at": stamp,
            "n_samples": int(enrollment.shape[0]),
            "n_features": int(enrollment.shape[1]),
        }
        with open(os.path.join(profile_dir, "metadata.json"), "w") as fh:
            json.dump(metadata, fh)

        return profile_dir

    def score_with_profile(self, profile_path: str, candidate: np.ndarray) -> float:
        from joblib import load

        ocsvm = load(os.path.join(profile_path, "profile.joblib"))
        # OneClassSVM decision_function: larger -> more inlier-like
        val = float(ocsvm.decision_function(candidate.reshape(1, -1))[0])
        # Normalize via sigmoid to (0,1)
        return sigmoid(val)

    def process(self, enrollment: np.ndarray, candidate: np.ndarray, create_profile_threshold: float = 0.65) -> Dict:
        """Main convenience method.

        Returns:
          dict with keys: 'hmm_prob', 'created_profile' (bool), 'profile_dir' or None, 'svm_prob' or None, 'final_confidence'
        """
        if enrollment.shape != (10, 16):
            raise ValueError("enrollment must be shape (10,16)")
        if candidate.shape != (16,):
            raise ValueError("candidate must be shape (16,)")

        # Train HMM
        self.train_hmm(enrollment)

        # HMM confidence
        hmm_p = self.hmm_confidence(candidate, enrollment=enrollment, temperature=1.0)

        created_profile = False
        profile_dir = None
        svm_p = None

        if hmm_p > create_profile_threshold:
            profile_dir = self.make_profile_and_save(enrollment, base_dir="profiles")
            created_profile = True
            svm_p = self.score_with_profile(profile_dir, candidate)
        # final confidence: if svm available average both, else use hmm
        if svm_p is not None:
            final = float((hmm_p + svm_p) / 2.0)
        else:
            final = float(hmm_p)

        return {
            "hmm_prob": float(hmm_p),
            "created_profile": created_profile,
            "profile_dir": profile_dir,
            "svm_prob": (None if svm_p is None else float(svm_p)),
            "final_confidence": float(final),
        }


# Simple helper for synthetic testing
def make_synthetic_user(n_steps: int = 10, n_dim: int = 16, seed: int = 0):
    rng = np.random.RandomState(seed)
    base = rng.normal(loc=0.0, scale=1.0, size=(n_dim,))
    enrollment = base + 0.05 * rng.normal(size=(n_steps, n_dim))
    # matching candidate
    candidate_good = base + 0.05 * rng.normal(size=(n_dim,))
    # non-matching
    candidate_bad = rng.normal(loc=5.0, scale=1.0, size=(n_dim,))
    return enrollment, candidate_good, candidate_bad
