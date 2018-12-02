#include <iostream>
#include <string>
#include <algorithm>
#include <fstream>

using namespace std;

int main (int argc, char *argv []) {
    string buffer;
    getline (cin, buffer, '\f');
    if (argc > 1 && string (argv [1]) == "-l") {
        transform (buffer.begin(), buffer.end(), buffer.begin(), ::tolower);
    }
    else {
        transform (buffer.begin(), buffer.end(), buffer.begin(), ::toupper);
    }
    cout << buffer;
    
    // Check if cwd parameter works correctly
    ofstream outputFile ("output.txt");
    outputFile << buffer;
    outputFile.close ();
}
