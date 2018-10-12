# Install Python modules

pip install mypy
pip install selenium

# Install chromedriver

wget -N http://chromedriver.storage.googleapis.com/2.30/chromedriver_linux64.zip -P ~/
unzip ~/chromedriver_linux64.zip -d ~/build/QQuick/Transcrypt
rm ~/chromedriver_linux64.zip


# Show where we are and what's there

pwd
ls -a -l

# Make everything executable and the rest

chmod -R 777 .

# Start headless browser instance, Python's webbrowser.open will now refer to this instance

#google-chrome-stable --headless --disable-gpu --remote-debugging-port=9222http://localhost &

# Enable shipment_test.py to find run_python

export PATH=$PATH:./transcrypt

# Run the shipment test

python ./transcrypt/development/shipment/shipment_test.py --unattended
