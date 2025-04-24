from flask import Blueprint, request, jsonify
from bson.objectid import ObjectId
from datetime import datetime
from pymongo import MongoClient
import os

job_bp = Blueprint("job_routes", __name__)
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]
jobs_collection = db.jobs

@job_bp.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = list(jobs_collection.find())
    for job in jobs:
        job["_id"] = str(job["_id"])
    return jsonify(jobs)

@job_bp.route("/jobs", methods=["POST"])
def add_job():
    job_data = request.get_json()
    print("Received job data:", job_data)  # 👈 LOG THIS

    required_fields = ["jobTitle", "company"]
    missing = [field for field in required_fields if field not in job_data]
    if missing:
        print("❌ Missing required fields:", missing)
        return jsonify({"error": f"Missing fields: {', '.join(missing)}"}), 400

    job_data.setdefault("postingLink", "")
    job_data.setdefault("status", "")
    job_data.setdefault("appliedDate", None)
    job_data.setdefault("rejectedDate", None)
    job_data.setdefault("resumeVersion", "")
    job_data.setdefault("notes", "")

    job_data["_id"] = ObjectId()
    jobs_collection.insert_one(job_data)
    print("✅ Job inserted:", job_data)
    return jsonify({"message": "Job added successfully!"}), 201


@job_bp.route("/jobs/<job_id>", methods=["PUT"])
def update_job(job_id):
    job_data = request.get_json()
    job_data["updated_at"] = datetime.utcnow()

    result = jobs_collection.update_one({"_id": ObjectId(job_id)}, {"$set": job_data})
    if result.matched_count == 0:
        return jsonify({"error": "Job not found"}), 404

    return jsonify({"message": "Job updated successfully!"}), 200

@job_bp.route("/jobs/<job_id>", methods=["DELETE"])
def delete_job(job_id):
    result = jobs_collection.delete_one({"_id": ObjectId(job_id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Job not found"}), 404

    return jsonify({"message": "Job deleted successfully!"}), 200
