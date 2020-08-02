# import os
# import csv

source = "./"
# with open('files.csv','w') as csvfile:
#     writer=csv.writer(csvfile,quoting=csv.QUOTE_ALL)
#     for file in os.listdir(source):
#         print(file)
        
#         if ".wav" in file:
#                 writer.writerow(str(file))
import os
from os.path import isfile, join 
import csv 
onlyfiles = [f for f in os.listdir(source) if isfile(join(source, f))] 
from os import walk  
f = [] 
for (dirpath, dirnames, filenames) in walk(source): 
    f.extend(filenames)     
    break 
 
f.sort()
with open('files.csv', 'w') as myfile:
    wr = csv.writer(myfile) 
    for F in f:
        if ".wav" in F:    
            wr.writerow([F,F.split(" ")[0],1])
