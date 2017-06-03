#!/usr/bin/env python3
#-*- coding: utf8 -*-

import sys



class Inpt:
    
    def filtr(self,source):
        return ''.join(c for c in source if c in '><+-!?{};:/\\~@')
    
    def flowrun(self):
        Syntaxhelp()
        while(True):
            try:
                source = input()
                code = Interpreter(source)
                code.run()
            except (KeyboardInterrupt, SystemExit, KeyError, IndexError, ValueError, EOFError, OverflowError):
                print("\n\n"+"-"*8+"\nLogic was unsuccessfully fucked with error code 666")
                del code
                exit(666)

    def filerun(self,srcpath):
        try:
            filesource = open(srcpath, "r")
            source = filesource.read()
            filesource.close()
            code = Interpreter(source)
            code.run()
        except (KeyboardInterrupt, SystemExit, KeyError, IndexError, ValueError, EOFError, OverflowError):
            print("\n\n"+"-"*8+"\nLogic was unsuccessfully fucked with error code 666")
            #del code
            exit(666)

class Interpreter:
    
    def __init__(self, sourceToInterpret):
        print(Inpt.filtr(self, sourceToInterpret))
        self.source = Inpt.filtr(self, sourceToInterpret)
              
    def getLoops(self):
        opened = []
        loops = {}
        for i in range(len(self.source)):
            if self.source[i] == '{':
                opened.append(i)
            elif self.source[i] == '}':
                loops[i] = opened[-1]
                loops[opened.pop()] = i
        return loops

    def run(self):
        (x,i) = (0,0)
        FuckTheLogicdict = {0: 0}
        blocks = self.getLoops()
        while i < len(self.source):
            __symbol = self.source[i]
            if __symbol == '>':
                x += 1
                FuckTheLogicdict.setdefault(x, 0)
            elif __symbol == '<':
                x -= 1
            elif __symbol == '+':
                FuckTheLogicdict[x] += 1
            elif __symbol == '-':
                FuckTheLogicdict[x] -= 1
            elif __symbol == ';':
                FuckTheLogicdict[x] = FuckTheLogicdict[x] << 1
            elif __symbol == ':':
                FuckTheLogicdict[x] = FuckTheLogicdict[x] >> 1
            elif __symbol == '/':
                FuckTheLogicdict[x] = 1 << FuckTheLogicdict[x]
            elif __symbol == "\\":
                FuckTheLogicdict[x] = 0
            elif __symbol == "~":
                FuckTheLogicdict[x] = FuckTheLogicdict[x-1]
            elif __symbol == '!':
                print(chr(FuckTheLogicdict[x]), end = "")
            elif __symbol == '@':
                print(hex(FuckTheLogicdict[x])[2::].upper(), end = "")
            elif __symbol == '?':
                FuckTheLogicdict[x] = int(input('\t\t>'))
            elif __symbol == '{':
                if not FuckTheLogicdict[x]: i = blocks[i]
            elif __symbol == '}':
                if FuckTheLogicdict[x]: i = blocks[i]
            i += 1


Syntaxhelp = lambda: print("""Here is a simple instuction for FuckTheLogic interpreter:
> incs data pointer
< decs data pointer
+ incs value at the data pointer
- decs value at the data pointer
! prints the byte at the data pointer
@ prints hex value of the byte at the data pointer
~ copies the byte value from previous data pointer to current
? gets the byte to the data pointer from keyboard
; shifts the bits at the data pointer left by one (mul by 2)
: shifts the bits at the data pointer right by one (div by 2)
/ shifts the bit 1 left by the value at the data pointer (2 in the power)
\ makes byte at the data pointer equals to 0


""")       


if __name__ == '__main__':
    inputed = Inpt()
    if (len(sys.argv)==1):
        inputed.flowrun()
    if (len(sys.argv)==2):
        if('ftl' in sys.argv[1].split('.')[-1]):
            inputed.filerun(sys.argv[1])
