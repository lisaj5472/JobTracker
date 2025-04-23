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
    # (Same as your current logic...)
    return jsonify({"message": "Job added successfully!"}), 201

# Add your PUT and DELETE logic here too...
