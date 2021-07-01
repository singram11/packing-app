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
                    "item": "belay device"
                },
                "nanopuff": {
                    "name":"nanopuff",
                    "item": "jacket"
                }}

model.connect_to_db(server.app)
model.db.create_all()

#create list default categories 
default_list_cat = []

for category in default_list_categories:

    new_cat = crud.create_list_category(category)
    default_list_cat.append(new_cat)


#create item default categories
default_item_cat = []

for category in default_item_categories:

    new_cat = crud.create_item_category(category)
    default_item_cat.append(new_cat)
    

#create gear 
sample_gear_list = []

for item in sample_gear:

    weight = None
    description = None
    img = None
    new_gear =  crud.create_gear(sample_gear[item]["name"], weight, description, img)
    sample_gear_list.append(new_gear)


#create list items 
sample_list_items = []

for item in sample_gear:
    name = sample_gear[item]["item"]
    category_obj = choice(default_item_cat)
    category = category_obj.name
    new_item = crud.create_item(name, category)
    sample_list_items.append(new_item)

#create users
test_users =[]
test_user_lists =[]
# i = 0

for n in range(10):
    email = f'user{n + 1}@test.com' 
    password = 'test'
    fname = f'firstname{n + 1}'
    lname = f'lastname{n + 1 }'

    user = crud.create_user(fname, lname, email, password)
    test_users.append(user)


    for i in range(2):
        category = choice(default_list_cat)
        name = f"My list: {i + 1} | User{n+1}"
        user_list = crud.create_list(user, name, category)
        test_user_lists.append(user_list)
   

# add items to list

for list_obj in test_user_lists:
    for i in range(2):
        rand_item = choice(sample_list_items)
        list_item_obj = crud.create_list_item(list_obj,rand_item)
        #add gear
        gear = choice(sample_gear_list)
        crud.add_gear_to_item(gear, list_item_obj)
         

