# Apache Ant script (compilation, Junit testing, packaging, etc) for the Web lab 3 code

Write a script for the Apache Ant utility that implements compilation, testing, and packaging into a jar-archive of the project code from laboratory work No. 3 of the "Web programming" discipline.

Each stage should be separated into a separate script block; all variables and constants used in the script must be placed in a separate parameter file; MANIFEST.MF should contain information about the version and about the class being started.

### The script must implement the following targets:

1. compile -- compilation of project source codes.
2. build -- compiling project sources and packing them into an executable jar. Compilation of source codes is implemented by calling the compile target.
3. clean -- remove compiled project classes and all temporary files (if any).
4. test -- run the project's junit tests. Before running the tests, you need to build the project (build target).
5. scp - moving the built project via scp to the selected server after the build is completed. You must first build the project (build target)
6. env - builds and runs the program in alternative environments; the environment is set by the java version and a set of virtual machine arguments in the options file.
