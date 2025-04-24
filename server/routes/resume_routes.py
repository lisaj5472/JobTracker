from flask import Blueprint, request, jsonify
from pymongo import MongoClient
from bson.objectid import ObjectId
from models.resume_model import validate_resume
import os

resume_bp = Blueprint("resume_routes", __name__)
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]
resumes_collection = db.resumes

@resume_bp.route("/resumes", methods=["POST"])
def add_resume():
    data = request.get_json()
    is_valid, result = validate_resume(data)
    if not is_valid:
        return jsonify({"error": result}), 400

    result["_id"] = ObjectId()
    resumes_collection.insert_one(result)
    return jsonify({"message": "Resume added successfully!"}), 201

@resume_bp.route("/resumes", methods=["GET"])
def get_resumes():
    resumes = list(resumes_collection.find())
    for r in resumes:
        r["_id"] = str(r["_id"])
    return jsonify(resumes)
