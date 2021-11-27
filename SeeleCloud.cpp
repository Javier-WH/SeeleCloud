#include <iostream>
#include <windows.h>
#include <string>

using namespace std;


std::string GetExeFileName()
{
	char buffer[MAX_PATH];
	GetModuleFileName( NULL, buffer, MAX_PATH );
	return std::string(buffer);
}

std::string GetExePath() 
{
	std::string f = GetExeFileName();
	return f.substr(0, f.find_last_of( "\\/" ));
}



int main(int argc, char *argv[]) {
	
	
	string path = "node "+GetExePath()+"\\src\\server\\server.js";	
	system(path.c_str());
	
	return 0;
}

