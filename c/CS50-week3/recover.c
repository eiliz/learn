#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    // check to make sure we got exactly 1 cl argument
    if(argc != 2) {
        fprintf(stderr, "Usage: ./recover image\n");
        return 1;
    }

    // open the file for reading
    FILE *images = fopen(argv[1], "r");

    // make sure the file opened correctly
    if(images == NULL) {
        fprintf(stderr, "An error occurred opening the file.");
        return 2;
    }

    // the file to be outputted
    FILE *img = NULL;

    // buffer to hold each chunk of 512B
    unsigned char buffer[512];

    // counter to be used for naming the images
    int count = 0;

    // flag to check if there's a file already open
    int flag = 0;

    // array to hold the file name, 8B to account for the end of string \0
    char filename[8];

    // reading 1 chunk of 512B at a time, from the file (images) into the buffer
    while(fread(buffer, 512, 1, images) == 1) {

        // checks for the start of a new JPEG sequence
        if(buffer[0] == 0xff && buffer[1] == 0xd8 &&
            buffer[2] == 0xff && (buffer[3] & 0xf0) == 0xe0) {

            // if the flag's value is 1, then we have an already open file that we must close
            if(flag == 1) {
                fclose(img);
            } else {
                flag = 1;
            }
            
            // create the file name and store it in the array
            sprintf(filename, "%03i.jpg", count);

            // create pointer to img file with name set to filename
            img = fopen(filename, "w");
            count++;
        }

        // the file has some other data bytes at the start so only begin writing after the flag has been set to 1
        if(flag == 1) {
          fwrite(buffer, 512, 1, img);
        }
    }

    // close all files
    fclose(images);
    fclose(img);

    // return success
    return 0;

}

// A = 00111100
// B = 00001101

// A&B = 00001100
// A|B = 00111101
// AˆB = 00110001
// (~A) = 10111101
// A << 2 = 11110000
// A >> 2 = 00001111


// the first 4 bits of the 4th byte of a JPEG header are always e/1110
// the next 4 bits can be anything from 0 to f
// so to account for any combination we do a bitwise & with 0xf0 which should return 0xe0
// a = 0xe[0-f] = 1110[0000]
// b = 0xf0 = 11110000
// a&b = 0xe0