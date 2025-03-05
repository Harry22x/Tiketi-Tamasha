# Standard library imports

# Remote library imports
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from flask_bcrypt import Bcrypt
import os                                                   
from flask_jwt_extended import JWTManager
# Local imports

# Instantiate app, set attributes
app = Flask(__name__)
app.secret_key = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
DATABASE_URI = os.environ.get('DATABASE_URI', 'sqlite:///app.db')  
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config["JWT_SECRET_KEY"] = b'Y\xf1Xz\x00\xad|eQ\x80t \xca\x1a\x10K'
jwt = JWTManager(app)
app.json.compact = False

# Define metadata, instantiate db
metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})
db = SQLAlchemy(metadata=metadata)
migrate = Migrate(app, db)
db.init_app(app)

bcrypt = Bcrypt(app)
# Instantiate REST API
api = Api(app)

# Instantiate CORS
CORS(app, supports_credentials=True, resources={
    r"/*": {
        "origins": ["https://euphonious-cupcake-bdec30.netlify.app","http://localhost:3000"], 
        "methods": ["GET", "POST", "PATCH", "DELETE"],
        "allow_headers": ["Content-Type","Authorization"],
        "expose_headers": ["Access-Control-Allow-Credentials"],
        "supports_credentials": True
    }
})
