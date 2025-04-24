from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from routes.job_routes import job_bp
from routes.resume_routes import resume_bp

load_dotenv()
app = Flask(__name__)
CORS(app)

# Register routes
app.register_blueprint(job_bp, url_prefix="/api")
app.register_blueprint(resume_bp, url_prefix="/api")

@app.route("/")
def home():
    return "Job Tracker Flask API is live!"

@app.route("/<path:path>", methods=["GET", "POST", "PUT", "DELETE"])
def catch_all(path):
    print(f"⚠️ Unhandled request to /{path}")
    return jsonify({"error": "Unhandled route", "path": path}), 404


if __name__ == "__main__":
    app.run(debug=True)
