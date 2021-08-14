# PackMe - Packing App

PackMe is an application that allows users to create, modify and store a variety of packing lists all in one place so they can reuse them each time they take a trip. It also allows users to associate specific gear they own with the items on their list so that they can track the details of the gear they own as well as make their lists specific to whatever type of adventure they want to go on.

## Contents

-   [Features](#features)
-   [Technologies & Stack](#techandstack)
-   [Setup & Installation](#setup)
-   [About the Developer](#about)<br>

## <a name="features"></a> Features

<br>

#### User registration and login

<br>

#### Add/Delete Lists

<br>

#### Add/Delete Items

<br>

#### Select/Add Gear

<br>

#### View Gear Details

<br>

## <a name="techandstack"><a> Technologies & Stack

<br>

**Backend:** Python, Flask, SQLAlchemy, PostgreSQL<br>
**FrontEnd:** React, Javascript, Babel, ReactRouter, ReactBootstrap, HTML, CSS<br>
**API's:** Cloudinary<br>

**Data Model:**

## <a name="setup"><a> Set-Up and Installation

<br>

### Requirements

<br>
You must have installed:

-   PostgrSQL
-   Python3
-   Flask
-   FlaskSQLAlchemy
-   Cloundinary
    <br>

You will also need (included via CDN):

-   React
-   ReactRouter
-   ReactBootstrap
    <br>

### How to install

<br>

Install [Python3](https://www.python.org/downloads/mac-osx/)<br>
Install [pip](https://pip.pypa.io/en/stable/installing/), the package installer for Python<br>
Install [postgreSQL](https://www.postgresql.org/) for the relational database.<br>

Clone or fork the repository:

```
$ git clone https://github.com/singram11/packing-app.git
```

Create and activate a virtual environment within the project directory:

```
$ virtualenv env
$ source env/bin/activate
```

Install dependencies:

```
$ pip3 install -r requirements.txt
```

Make an account with [Cloudinary](https://cloudinary.com/documentation) & get your API key

Store the keys in a file named 'secrets.sh':

```
$ source secrets.sh
```

With PostgreSQL installed create a database to store the user information:

```
$ createdb packme
```

If you want some test users and sample data you can run the seed_database.py file:

```
$ python3 seed_database.py
```

Note this will DROP the database and recreate it with the demo information - once you have data in your DB you will NOT want to run this unless you want to clear the DB.

Then run the server from the command line:

```
$ python3 server.py
```

## <a name="about"><a>About the Developer
