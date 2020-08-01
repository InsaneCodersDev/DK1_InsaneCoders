import pyaudio
import wave
import os
import pickle
import time
from scipy.io.wavfile import read
import csv
import numpy as np
import generategmm as gg
verbose=True
print_success=True
thres=0.4
print_scores=False
ambiguity=1
from main_functions import *

def recognize(filename,thres=0.4,ambiguity=1,verbose=False):
    # Voice Authentication
    FORMAT = pyaudio.paInt16
    audio = pyaudio.PyAudio()
    modelpath = "./gmm_models/"
    gmm_files = [os.path.join(modelpath,fname) for fname in 
                os.listdir(modelpath) if fname.endswith('.gmm')]
    models    = [pickle.load(open(fname,'rb')) for fname in gmm_files]
    speakers   = [fname.split("/")[-1].split(".gmm")[0] for fname 
                in gmm_files]

    if len(models) == 0:
        print("No Users in the Database!")
        return
        
    #read test file
    sr,audio = read(filename)
    
    # extract mfcc features
    vector = extract_features(audio,sr)
    log_likelihood = np.zeros(len(models)) 
    diff=np.zeros(len(models))
    #checking with each model one by one
    for i in range(len(models)):
        gmm = models[i]         
        scores = np.array(gmm.score(vector))
        log_likelihood[i] = scores.sum()
        if verbose and print_scores:
            print("Score for ",speakers[i]," is:",log_likelihood[i])

    pred = np.argmax(log_likelihood)
    identity = speakers[pred]
    if verbose and print_scores:
        print(log_likelihood[pred])
    count=0
    for i in range(len(models)):
        diff[i]=log_likelihood[pred]-log_likelihood[i]
        if verbose:
            print(f"{speakers[i]}: {diff[i]}",end=" ")
        if diff[i]>thres:
            count=count+1
    if verbose:
        #print(diff)
        print(count)
    # if voice not recognized than terminate the process
    if identity == 'unknown' or identity == 'unknown2' or identity == 'unknown3' or identity == 'unknown4' or identity == 'unknown5':
            if verbose:
                print("Not Recognized! Try again...\n")
            return "Not identified"
    else:
        if count>=len(models)-ambiguity:
            if verbose:
                print( f"Recognized as - {identity} \n")
            return identity
        else:
            if verbose:
                print( "Not recognised try again\n")
            return "Not identified"

def test(thres=0.4,ambiguity=1,verbose=False):
        correct=0
        total=0
        false_negatives=0
        print(f"\nEvaluation report(thres={thres}) & ambiguity={ambiguity}:")
        with open('files.csv','r') as f:
            r=csv.reader(f)
            for line in r:
                if line==[]:
                    break
                if not verbose:
                    print(f"Audio by:{line[0]}")
                identity=recognize(line[0],thres,ambiguity)
                if identity==line[1]:
                    if print_success:
                        if not verbose:
                            print(f"\u001b[32m Success: {line[1]} was correctly recognized.")
                    correct+=1
            
                elif identity=="Not identified" and line[2]=="0":
                    correct+=1
                    if print_success:
                        if not verbose:
                            print(f"\u001b[32m Success: Incorrect recording by {line[1]} was marked as not recognized.")
                elif identity=="Not identified" and line[2]=='1':
                    false_negatives+=1
                    if not verbose:
                        print(f"\u001b[33m Partial Failure: {line[1]} was Marked as {identity}")
                else:
                    if not verbose:
                        print(f"\u001b[31m Failure: {line[1]} was incorrectly marked as {identity}")
                total+=1
        print("Overall Accuracy = "+str(100*correct/total))
        print(f"Accuracy= {str(100*(correct+false_negatives)/total)}\n")
    

if __name__ == '__main__':
    # gg.add_user(39)
    # for ambiguity in range(1,7,1):
    #     for thres in np.arange(0,5,0.1):
    #         test(thres,ambiguity,verbose=True)
    test(2.75,4,verbose=False)

        

        