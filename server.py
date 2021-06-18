""" Server for the packing app"""

from flask import Flask, render_template, flash, session, redirect, jsonify

from model import connect_to_db
import crud

app = Flask(__name__)
app.secret_key = "dev"
#do the thing - markov bot lab

@app.route('/')
def render_homepage():
    """ Shows homepage """

    return render_template('index.html')

@app.route('/gear')
def render_gear_page():
    """ Shows my gear template """

    return render_template('gear.html')

@app.route('/lists')
def render_list_page():
    """Show list page template"""

    return render_template('lists.html')

@app.route('/userlists')
def show_user_lists():
    # user = get from session 
    user = crud.get_user_object('user1@test.com')
    lists = crud.get_lists_by_user(user)
    
    user_lists = {}

    for user_list in lists:
        user_lists[user_list.list_id] = {'name': user_list.name,
                                        'category': user_list.category.name
        }
       
            
        # need to get gear items by list and name 

        # gear_objs = user_list.list_items
        
        # gear_list = []
        # for gear in gear_objs:
        #     print(gear.name)
        #     gear_list.append(gear.name)

        # list_info["List Items"] = gear_list

    return jsonify(user_lists)

@app.route('/userlist/items')
def show_list_items():
    
    #find better way to pass list
    user = crud.get_user_object('user1@test.com')
    lists = crud.get_lists_by_user(user)


    list_items = crud.get_list_items(lists[0])

    list_item_data = {}

    for item in list_items:

        list_item_data[item.item_id] = {'name': item.name,
                                        'category': item.item_category.name,
                                        'gear': item.gear[0].name}

    return jsonify(list_item_data)
        

@app.route('/usergear')
def show_user_gear():

    # user = get from session 
    user = crud.get_user_object('user1@test.com')
    user_gear = crud.get_gear_by_user(user)
    
    gear_data = {}

    for item in user_gear:

        gear_data[item.gear_id] = {'name': item.name,
                                    'weight': item.weight,
                                    'description':item.description,
                                    'img': item.img}
    return jsonify(gear_data)


    
    #run function from crud to return user gear
    #turn that in to json and return 

    





if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='127.0.0.1', debug=True)