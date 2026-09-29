from flask import Flask, request, jsonify
from dotenv import load_dotenv
from openai import OpenAI
import os

load_dotenv()

app = Flask(__name__)

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    print("ERROR: API key nahi mili. .env check karo.")
else:
    client = OpenAI(api_key=api_key)


@app.route("/")
def home():
    return "AI FlashLearn Backend is Running!"


@app.route("/ask", methods=["POST"])
def ask_ai():

    try:
        data = request.get_json()

        question = data.get("question", "").strip()

        if not question:
            return jsonify({
                "error": "Question empty hai."
            }), 400

        response = client.responses.create(
            model="gpt-5.6-luna",
            input=question
        )

        return jsonify({
            "answer": response.output_text
        })

    except Exception as e:
        return jsonify({
            "error": str(e)
        }), 500


if __name__ == "__main__":
    app.run(debug=True)