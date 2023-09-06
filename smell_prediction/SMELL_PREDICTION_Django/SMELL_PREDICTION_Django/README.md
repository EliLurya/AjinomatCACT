START

pip install Django django-extensions
pip install django-environ
pip install mordred
pip install pubchempy
pip install numpy scikit-learn

To move csv file to DB
python manage.py your_command_name path_to_csv_file.csv
python manage.py makemigrations
python manage.py migrate



python manage.py createsuperuser
python manage.py runserver
