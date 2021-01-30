import numpy as np
import datetime as dt

import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData
from flask import Flask, jsonify

app = Flask(__name__)
engine = create_engine("postgres://postgres:#Drummer101@localhost:5432/Video_Game_DB")

@app.route("/")
def game():
    data = engine.execute("SELECT * FROM video_game_view")

    game_list = []

    for developer, number_of_games, avg_user_rating, total_number_of_raters, avg_price, primary_genre in data:
        game_data = {}
        game_data["developer"] = developer
        game_data["number_of_games"] = float(number_of_games)
        game_data["avg_user_rating"] = float(avg_user_rating)
        game_data["total_number_of_raters"] = int(total_number_of_raters)
        game_data["avg_price"] = float(avg_price)
        game_data["primary_genre"] = primary_genre

        game_list.append(game_data)
        
    return jsonify(game_list)

if __name__ == "__main__":
    app.run(debug=True)
