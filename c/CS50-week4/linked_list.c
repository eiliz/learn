#include <stdio.h>
#include <stdlib.h>

typedef struct node {
  int number;
  struct node *next;
} node;

int main(int argc, char *argv[]) {
  if (argc < 1) {
    return 1;
  }

  node *numbers = NULL;

  for(int i = 1; i < argc; i++) {
    node *n = malloc(sizeof(node));
    n->number = atoi(argv[i]);
    n->next = NULL;

    if (numbers) {
      for(node *ptr = numbers; ptr != NULL; ptr = ptr->next) {
        if (!ptr->next) {
          printf("ptr->next is NULL so we set it to the node containing the number %i\n", n->number);
          ptr->next = n;
          printf("%i %i\n", ptr->number, ptr->next->number);
          break;
        }
      }
    } else {
      numbers = n;
      printf("The initial setup of the linked list %i\n", n->number);
    }
  }

}