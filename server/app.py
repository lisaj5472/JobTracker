from flask import Flask, jsonify, request
from pymongo import MongoClient
from dotenv import load_dotenv
from flask_cors import CORS
import os
from datetime import datetime
from bson.objectid import ObjectId

# Load environment variables from .env
load_dotenv()

# Set up Flask app
app = Flask(__name__)
CORS(app)

# MongoDB connection
mongo_uri = os.getenv("MONGO_URI")
db_name = os.getenv("DB_NAME")
client = MongoClient(mongo_uri)
db = client[db_name]
jobs_collection = db.jobs

@app.route("/")
def home():
    return "Job Tracker Flask API is live!"

@app.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = list(jobs_collection.find())
    for job in jobs:
        job["_id"] = str(job["_id"])
    return jsonify(jobs)

@app.route("/jobs", methods=["POST"])
def add_job():
    job_data = request.get_json()

    required_fields = ["jobTitle", "company"]
    missing = [field for field in required_fields if field not in job_data]
    if missing:
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    job_data.setdefault("postingLink", "")
    job_data.setdefault("status", "")
    job_data.setdefault("appliedDate", None)
    job_data.setdefault("rejectedDate", None)
    job_data.setdefault("resumeVersion", "")
    job_data.setdefault("notes", "")

    today = datetime.today().strftime("%Y-%m-%d")
    if job_data["status"] == "Applied" and not job_data["appliedDate"]:
        job_data["appliedDate"] = today
    if job_data["status"] == "Rejection Received" and not job_data["rejectedDate"]:
        job_data["rejectedDate"] = today

    job_data["_id"] = ObjectId()
    jobs_collection.insert_one(job_data)
    return jsonify({"message": "Job added successfully!"}), 201

@app.route("/jobs/<job_id>", methods=["PUT"])
def update_job(job_id):
    updated_data = request.get_json()
    updated_data.pop("_id", None)

    result = jobs_collection.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": updated_data}
    )

    return jsonify({"message": "PUT attempted", "matched": result.matched_count, "modified": result.modified_count}), 200


@app.route("/jobs/<job_id>", methods=["DELETE"])
def delete_job(job_id):
    result = jobs_collection.delete_one({"_id": ObjectId(job_id)})
    if result.deleted_count == 1:
        return jsonify({"message": "Job deleted"}), 200
    else:
        return jsonify({"error": "Job not found"}), 404

if __name__ == "__main__":
    app.run(debug=True)
