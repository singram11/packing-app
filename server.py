""" Server for the packing app"""

from flask import Flask, render_template, flash, session, redirect, jsonify, request

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
def render_lists_page():
    """Show list page template"""

    return render_template('lists.html')

# @app.route('/list/list_details')
# def render_list_details_page(list_id):
#     """Show list details page"""

#     print(f"list id: {list_id}")

#     return render_template('list-details.html')

@app.route('/api/userlists')
def show_user_lists():
    # user = get from session 
    user = crud.get_user_object('user1@test.com')
    lists = crud.get_lists_by_user(user)
    
    user_lists = {}

    for user_list in lists:
        user_lists[user_list.list_id] = {'name': user_list.name,
                                        'category': user_list.category.name
        }
            
    return jsonify(user_lists)

@app.route('/userlists/items/<list_id>')
def show_list_items(list_id):
    
    #find better way to pass user obj
    # user = crud.get_user_object('user1@test.com')
    # lists = crud.get_lists_by_user(user)

    
    list_items = crud.get_list_items_by_id(list_id)

    list_item_data = {}

    for item in list_items:

        list_item_data[item.item_id] = {'name': item.name,
                                        'category': item.item_category.name,
                                        'gear': item.gear[0].name}

    return jsonify(list_item_data)
        


@app.route('/api/usergear')
def show_user_gear_list():

    # user = get from session 
    user = crud.get_user_object('user1@test.com')
    user_gear = crud.get_gear_by_user(user)
    
    gear_data = {}

    for item in user_gear:

        gear_data[item.gear_id] = {'name': item.name}
                                    # 'weight': item.weight,
                                    # 'description':item.description,
                                    # 'img': item.img}
    return jsonify(gear_data)

@app.route('/api/usergear/details/<gear_id>')
def show_user_gear_item(gear_id):

    # user = get from session 
    # user = crud.get_user_object('user1@test.com')
    # user_gear = crud.get_gear_by_user(user)
    gear = crud.get_gear_by_id(gear_id)

    gear_data = {'name': gear.name,
                'weight': gear.weight,
                'description':gear.description,
                'img': gear.img}

    return jsonify(gear_data)


@app.route("/new-list-item", methods=['POST'])
def create_new_list_item():
    """Add a new list item to the DB"""

    name = request.form.get('name')
    category = request.form.get('category')

    crud.create_list_item(name, category)
    ## THIS ALSO NEEDS TO ADD THE RELEVANT LIST!!
    return redirect('/')


@app.route("/new-list", methods=['POST'])
def create_new_list():
    """Add a new list to the DB"""

    # user = get from session 
    user = crud.get_user_object('user1@test.com')
    name = request.form.get('name')
    category = request.form.get('category')

    category_obj = crud.get_list_cat_by_name(category)
    crud.create_list(user, name, category_obj)

    return redirect('/')

if __name__ == '__main__':
    connect_to_db(app)
    app.run(host='127.0.0.1', debug=True)