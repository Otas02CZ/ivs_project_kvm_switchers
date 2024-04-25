import random

def create_random_data_file(amoutn_of_entries : int):

    with open(f'data_{amoutn_of_entries}.txt', 'w') as f:

        for i in range(amoutn_of_entries):
            f.write(f'{random.randint(0, 10000)}\n')


if __name__ == '__main__':

    create_random_data_file(50000)