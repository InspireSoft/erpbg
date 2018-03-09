#!/usr/bin/env python
# -*- coding: utf-8 -*-

import sys
# sys.path.append('/home/dev1/opencv/lib/')
sys.path.append('/usr/local/lib/python2.7/site-packages')
# sys.path.append('/home/frappe/frappe-bench-dimela/env/lib/python2.7/site-packages')
import numpy as np
import cv2
import csv
import glob


class Searcher:
    def __init__(self, indexPath):
        # store our index path
        self.indexPath = indexPath

    def search(self, queryFeatures, limit=10):
        # initialize our dictionary of results
        results = {}

        # open the index file for reading
        with open(self.indexPath) as f:
            # initialize the CSV reader
            reader = csv.reader(f)

            # loop over the rows in the index
            for row in reader:
                # parse out the image ID and features, then compute the
                # chi-squared distance between the features in our index
                # and our query features
                features = [float(x) for x in row[1:]]
                d = self.chi2_distance(features, queryFeatures)

                # now that we have the distance between the two feature
                # vectors, we can udpate the results dictionary -- the
                # key is the current image ID in the index and the
                # value is the distance we just computed, representing
                # how 'similar' the image in the index is to our query
                results[row[0]] = d

            # close the reader
            f.close()

        # sort our results, so that the smaller distances (i.e. the
        # more relevant images are at the front of the list)
        results = sorted([(v, k) for (k, v) in results.items()])

        # return our (limited) results
        return results[:limit]

    def chi2_distance(self, histA, histB, eps=1e-10):
        # compute the chi-squared distance
        d = 0.5 * np.sum([((a - b) ** 2) / (a + b + eps)
                          for (a, b) in zip(histA, histB)])

        # return the chi-squared distance
        return d


class ColorDescriptor:
    def __init__(self, bins):
        # store the number of bins for the 3D histogram
        self.bins = bins

    def describe(self, image):
        # convert the image to the HSV color space and initialize
        # the features used to quantify the image
        image = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
        features = []

        # grab the dimensions and compute the center of the image
        (h, w) = image.shape[:2]
        (cX, cY) = (int(w * 0.5), int(h * 0.5))

        # divide the image into four rectangles/segments (top-left,
        # top-right, bottom-right, bottom-left)
        segments = [(0, cX, 0, cY), (cX, w, 0, cY), (cX, w, cY, h),
                    (0, cX, cY, h)]

        # construct an elliptical mask representing the center of the
        # image
        (axesX, axesY) = (int(w * 0.75) / 2, int(h * 0.75) / 2)
        ellipMask = np.zeros(image.shape[:2], dtype="uint8")
        cv2.ellipse(ellipMask, (cX, cY), (axesX, axesY), 0, 0, 360, 255, -1)

        # loop over the segments
        for (startX, endX, startY, endY) in segments:
            # construct a mask for each corner of the image, subtracting
            # the elliptical center from it
            cornerMask = np.zeros(image.shape[:2], dtype="uint8")
            cv2.rectangle(cornerMask, (startX, startY), (endX, endY), 255, -1)
            cornerMask = cv2.subtract(cornerMask, ellipMask)

            # extract a color histogram from the image, then update the
            # feature vector
            hist = self.histogram(image, cornerMask)
            features.extend(hist)

        # extract a color histogram from the elliptical region and
        # update the feature vector
        hist = self.histogram(image, ellipMask)
        features.extend(hist)

        # return the feature vector
        return features

    def histogram(self, image, mask):
        # extract a 3D color histogram from the masked region of the
        # image, using the supplied number of bins per channel; then
        # normalize the histogram
        hist = cv2.calcHist([image], [0, 1, 2], mask, self.bins,
                            [0, 180, 0, 256, 0, 256])
        hist = cv2.normalize(hist, False).flatten()

        # return the histogram
        return hist


@frappe.whitelist()
def get_data():
    pyimagesearch = {}
    pyimagesearch["dataset1"] = "/home/frappe/frappe-bench-dimela/sites/dimela/public/files"
    pyimagesearch["dataset2"] = "/home/frappe/frappe-bench-dimela/sites/dimela/private/files"
    pyimagesearch["index"] = "/home/frappe/frappe-bench-dimela/sites/dimela/dataset.csv"
    pyimagesearch["result_path"] = "/home/frappe/frappe-bench-dimela/sites/dimela/private/files"
    return pyimagesearch


def loopDir(path, type, output, cd):
    # use glob to grab the image paths and loop over them
    for imagePath in glob.glob(path + "/*." + str(type)):
        try:
            # extract the image ID (i.e. the unique filename) from the image
            # path and load the image itself
            imageID = imagePath[imagePath.rfind("/") + 1:]
            image = cv2.imread(imagePath)
            # describe the image
            features = cd.describe(image)
            # write the features to file
            features = [str(f) for f in features]
            output.write("%s,%s\n" % (imageID, ",".join(features)))
        except:
            pass


pyimagesearch = get_data()

# initialize the color descriptor
cd = ColorDescriptor((8, 12, 3))

# open the output index file for writing
output = open(pyimagesearch["index"], "w")

# use glob to grab the image paths and loop over them
loopDir(pyimagesearch["dataset1"], "png", output, cd)
loopDir(pyimagesearch["dataset2"], "png", output, cd)
loopDir(pyimagesearch["dataset1"], "jpg", output, cd)
loopDir(pyimagesearch["dataset2"], "jpg", output, cd)

# close the index file
output.close()
