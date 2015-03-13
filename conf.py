import os

class Config(object):
    DEBUG = True
    TESTING = True
    LOG_LEVEL = os.environ.get('LOG_LEVEL', 'DEBUG')
    FBAPI_APP_ID = os.environ.get('211276322329618')
    FBAPI_APP_SECRET = os.environ.get('3d827694bd63df1520e9029060c21afd')
    FBAPI_SCOPE = ['user_likes', 'user_photos', 'user_photo_video_tags']
