""" Script to Seed db with temporary test data """

import os
from random import choice, randint

import model
import server
import crud

os.system('dropdb packme')
os.system('createdb packme')


default_list_categories = ["camping", "backpacking", "travel", "climbing"]

default_item_categories = ["clothes", "shelter", "kitchen",]

sample_gear = { "jetboil": {
                    "name": "jetboil",
                    "item": "stove"
                },
                "half dome 2":{
                    "name": "half dome 2",
                    "item": "tent"
                },
                "petzel 2 grigri": {
                    "name": "petzel 2 grigri",
                    "item": "belay_device"
                },
                "nanopuff": {
                    "name":"nanopuff",
                    "item": "jacket"
                }}

model.connect_to_db(server.app)
model.db.create_all()

#create list default categories 

list_cat = []

for category in default_list_categories:

    new_cat = crud.create_list_category(category)
    list_cat.append(new_cat)


#create item default categories
item_cat = []

for category in default_item_categories:

    new_cat = crud.create_item_category(category)
    item_cat.append(new_cat)
    

#create gear 
gear_list = []
for item in sample_gear:

    weight = None
    description = None
    img = None
    new_gear =  crud.create_gear(sample_gear[item]["name"], weight, description, img)
    gear_list.append(new_gear)


#create list items 
item_list = []

for item in sample_gear:

    new_item = crud.create_list_item(sample_gear[item]["item"])
    item_list.append(new_item)

#create users
i = 0

for n in range(10):
    email = f'user{n}@test.com'  # Voila! A unique email!
    password = 'test'

    user = crud.create_user(email, password)
    i = i + 1

    for n in range(2):
        category = choice(list_cat)
        list_no = i + n 
        name = f"List no: {list_no}"
        create_list(user, name, category)
        
         
        #add 2 random items to list 
