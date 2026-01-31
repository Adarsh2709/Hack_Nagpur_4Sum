"""Example script demonstrating the pipeline with synthetic data."""
from __future__ import annotations

import numpy as np
from hmm_svm_pipeline import BiometricPipeline, make_synthetic_user


def main():
    enrollment, candidate_good, candidate_bad = make_synthetic_user(seed=123)
    pipeline = BiometricPipeline(n_components=4, random_state=123)

    print("--- Testing good candidate (should be high confidence) ---")
    res_good = pipeline.process(enrollment, candidate_good, create_profile_threshold=0.65)
    print(res_good)

    print("--- Testing bad candidate (should be low confidence) ---")
    res_bad = pipeline.process(enrollment, candidate_bad, create_profile_threshold=0.65)
    print(res_bad)


if __name__ == "__main__":
    main()
