from random import randint

print("Welcome! Guess!")

pc = randint(1, 10)

playing = True

while playing:
    print(pc)
    user_choice = int(input("What number do you want?"))
    if user_choice == pc:
        print("You won!")
        playing = False
    elif user_choice < pc:
        print("Higher, Guess other number")
    elif user_choice > pc:
        print("Lower, Guess other number.")
