#include <iostream>
#include <string>
#include <algorithm>

using namespace std;

int main () {
    string buffer;
    getline (cin, buffer, '\f');
    transform (buffer.begin(), buffer.end(), buffer.begin(), ::toupper);
    cout << buffer;
}
