import pyaudio
import wave
import os
import pickle
import time
from scipy.io.wavfile import read
from IPython.display import Audio, display, clear_output
import recognize3 as r
from os.path import isfile, join 
from main_functions import *
from os import walk  

def add_user(r):
    #Voice authentication
    names=[]
    for f in os.listdir("./gmm_models2"):
        f=f.split(".")
        names.append(f[0])
    for name in names:
        source = "./voice_database/" + name
        dest =  "./gmm_models2/"
        count = 1

        for path in os.listdir(source):
            path = os.path.join(source, path)

            features = np.array([])

            # reading audio files of speaker
            (sr, audio) = read(path)

            # extract 40 dimensional MFCC & delta MFCC features
            vector   = extract_features(audio,sr)

            if features.size == 0:
                features = vector
            else:
                features = np.vstack((features, vector))

            # when features of 3 files of speaker are concatenated, then do model training
            if count == 10:    
                gmm = GaussianMixture(n_components = 12, max_iter = 500, covariance_type='spherical',random_state=r)
                gmm.fit(features)

                # saving the trained gaussian model
                pickle.dump(gmm, open(dest + name + '.gmm', 'wb'))
                # print(name + ' added successfully') 

                features = np.asarray(())
                count = 0
            count = count + 1

if __name__ == '__main__':
    for i in range(1,100,1):
        print(f"Random State: {i}")
        add_user(i)
        r.test(thres=0,ambiguity=1,verbose=True)
    add_user(1)