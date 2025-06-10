from flask import Flask, jsonify
from flask_cors import CORS
import psutil

app = Flask(__name__)
CORS(app)

@app.route("/get_stats", methods=["GET"])
def get_stats():

    cpu_count = psutil.cpu_count(logical=False)
    cpu_usage_percent = psutil.cpu_percent(interval=1, percpu=False)
    memory_usage = psutil.virtual_memory()
    return jsonify({
        "cpu": {
            "number": cpu_count,
            "percent_used": cpu_usage_percent
        },
        "memory": {
            "total": round(memory_usage.total / (1024 ** 2), 2),
            "available": round(memory_usage.available / (1024 ** 2), 2),
            "percent_used": memory_usage.percent
        }
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)