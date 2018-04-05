import time

def print_current_time(self):
    localtime = time.asctime(time.localtime(time.time()))
    print("The current time is {}".format(localtime))
