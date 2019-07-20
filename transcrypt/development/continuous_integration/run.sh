# Create symlink for chromedriver

ln -s /usr/lib/chromium-browser/chromedriver ~/bin/chromedriver

# Install Python modules

pip install flake8 mypy selenium

# Show where we are and what's there

pwd
ls -a -l

# Look for Python syntax errors and undefined names

flake8 . --count --select=E9,F63,F7,F823 --show-source --statistics

# Make everything executable and the rest

chmod -R 777 .

# Enable shipment_test.py to find run_python

export PATH=$PATH:./transcrypt

# Run the shipment test

python ./transcrypt/development/shipment/shipment_test.py --unattended
