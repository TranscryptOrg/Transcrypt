# Create symlink for chromedriver

ln -s /usr/lib/chromium-browser/chromedriver ~/bin/chromedriver

# Install Python modules

pip install mypy
pip install selenium

# Show where we are and what's there

pwd
ls -a -l

# Make everything executable and the rest

chmod -R 777 .

# Enable shipment_test.py to find run_python

export PATH=$PATH:./transcrypt

# Run the shipment test

python ./transcrypt/development/shipment/shipment_test.py --unattended
