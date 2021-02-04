import numpy as np
import datetime as dt
import json

import pandas as pd
import sqlalchemy
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, MetaData
from flask import Flask, jsonify, render_template, request

app = Flask(__name__)
engine = create_engine("postgres://postgres:#Drummer101@localhost:5432/Video_Game_DB")



@app.route("/")
def welcome():
    return(
        f"Use below route to reach our game data!:<br/>"
        f"/game<br/>"

    )


@app.route("/game")
def game():
    data = engine.execute("SELECT * FROM video_game_view2")

    game_list = []

    for developer, number_of_games, avg_user_rating, total_number_of_raters, avg_price, primary_genre, price_point_app in data:
        game_data = {}
        game_data["developer"] = developer
        game_data["number_of_games"] = float(number_of_games)
        game_data["avg_user_rating"] = float(avg_user_rating)
        game_data["total_number_of_raters"] = int(total_number_of_raters)
        game_data["avg_price"] = float(avg_price)
        game_data["primary_genre"] = primary_genre
        game_data["price_point_app"] = price_point_app

        game_list.append(game_data)
        
    return render_template('index.html', game_list=game_list)

@app.route("/data")
def data():
    #tf = request.args.get("tf", 0)
    json_data = engine.execute(f"SELECT * FROM video_game_view2")
     #where price_point_app = {tf}")

    json_game_list = []

    for developer, number_of_games, avg_user_rating, total_number_of_raters, avg_price, primary_genre, price_point_app in json_data:
        json_game_data = {}
        json_game_data["developer"] = developer
        json_game_data["number_of_games"] = float(number_of_games)
        json_game_data["avg_user_rating"] = float(avg_user_rating)
        json_game_data["total_number_of_raters"] = int(total_number_of_raters)
        json_game_data["avg_price"] = float(avg_price)
        json_game_data["primary_genre"] = primary_genre
        json_game_data["price_point_app"] = price_point_app

        json_game_list.append(json_game_data)

    return jsonify(json_game_list)

if __name__ == "__main__":
    app.run(debug=True)
