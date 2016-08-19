import time


class Timer:

    def __init__(self):
        self.timer_attribute = 'I have no idea what should be here'

    def start_timer(self):
        start_time = time.time()
        return start_time

    def stop_timer(self):
        stop_time = time.time()
        return stop_time