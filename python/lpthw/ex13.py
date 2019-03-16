from sys import argv

fat_cat = """
I'll do a list:
\t Cat food
\t Fishes
\t Catnip
\t Eggs
"""

fatter_cat = "A second list of\ncat food"

# print(fat_cat)
# print(fatter_cat)

for arg in argv:
  print(arg)

# setting end makes print not go on the next line

# print("How tall are you? ", end=' ')
# height = input()

# print(f"I'm {height} tall!")
# print("I'm {} tall!".format(height))

print("How old are you?", input())

