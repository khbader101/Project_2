create table video_game_data (id int,
						name text,
						average_user_rating decimal,
						user_rating_count decimal,
						price decimal,
						in_app_purchases varchar,
						developer varchar,
						age_rating varchar,
						languages varchar,
						size numeric,
						primary_genre varchar,
						genres varchar,
						original_release_date date
						
);	

select developer, count(name) as "number_of_games", round(avg(average_user_rating),2) as "avg_user_rating", sum(user_rating_count) as "total_number_of_raters", round(avg(price),2) as "avg_price", primary_genre 
into video_game_view
from video_game_data vg
where average_user_rating is not null
group by developer, primary_genre

select * from video_game_view
order by developer 


drop table video_games








