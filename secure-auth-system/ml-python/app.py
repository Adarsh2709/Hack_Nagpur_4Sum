from flask import Flask, request, jsonify
import numpy as np
from hmm_svm_pipeline import BiometricPipeline

app = Flask(__name__)
pipeline = BiometricPipeline()

@app.route('/api/ml/process', methods=['POST'])
def process_biometrics():
    data = request.json
    enrollment = np.array(data['enrollment'])
    candidate = np.array(data['candidate'])
    
    threshold = data.get('threshold', 0.65)
    
    try:
        result = pipeline.process(enrollment, candidate, create_profile_threshold=threshold)
        return jsonify(result)
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
