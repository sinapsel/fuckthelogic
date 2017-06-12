# fuckthelogic
## FuckTheLogic is an esoteric and imperative programming language with a small but useful set of commands

### Commands
* `> incs data pointer`
* `< decs data pointer`
* `+ incs value at the data pointer`
* `- decs value at the data pointer`
* `~ copies the byte value from previous data pointer to current`
* `! prints the byte at the data pointer`
* `@ prints hex value of the byte at the data pointer`
* `? gets the byte to the data pointer from keyboard`
* `; shifts the bits at the data pointer left by one (mul by 2)`
* `: shifts the bits at the data pointer right by one (div by 2)`
* `/ shifts the bit 1 left by the value at the data pointer (2 in the power)`
* `{ opens loop while the value at the data pointer is not 0`
* `} closes loop`
* `( starts condition if the value at the data poiner is not 0`
* `) closes condition and opens else-condition`
* `\ closes else condition`
*   For reference: if you need if(x) statement use (code)\, if if(not x) - ()code\, if if(x){code}else{code2} - (code)code2\ 

### Interpreting and compiling
+   Interpreter: fuckthelogic.py
+   Compiller will be here soon

### Using interpreter:
* Run in the console and ~~suffer~~ code
* Run in the console with the file location argument; Ex: `$ fuckthelogic.py helloworld.ftl`

### Errors and exceptions
  For each error, exception or bag program exits with error
  

##### by Sinapsel with MIT license
