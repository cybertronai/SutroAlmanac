---
title: "Meeting 2: Forward-Forward Algorithm"
description: "Reading group notes on Hinton's 2022 Forward-Forward paper, with critiques and follow-up experiments."
---

Reading group discussion of Geoffrey Hinton's "The Forward-Forward Algorithm: Some Preliminary Investigations" (Hinton, 2022). These notes synthesize the paper's core claims with the critiques, open questions, and follow-up topics that came up in the discussion.

The paper is available as a [Google Doc summary](https://docs.google.com/document/d/1IdXRUhPRoWt8xLH1Y6iRWRx1g9-gbotFiiAnVixJYZY/edit?tab=t.0). A related write-up is [Jamie Simon's implementation notes](https://docs.google.com/document/d/1u8pIWg2iWc9R-dQgXz2Yt6xgF2fWP0GbDipbIxF1v1Y/edit?tab=t.0).

## Summary of the paper

**Core motivation.** Forward-Forward (FF) is proposed as an alternative to backpropagation (BP). Hinton argues BP is a poor model of biological learning and that it blocks the development of energy-efficient analog hardware.

- Bio-implausibility: the brain cannot freeze neural activity to propagate error derivatives backward, nor does it have the symmetric connectivity needed to send errors back through the same synapses used for the forward pass.
- Hardware constraints: BP needs perfect knowledge of the forward pass to compute derivatives. That rules out analog or black-box hardware (variable and noisy) and prevents pipelining a continuous data stream, because the network must wait for the backward pass.

**The mechanism.** Instead of a forward pass followed by a backward pass, FF uses two forward passes with opposing objectives.

- Positive pass (wake): the network processes real data, such as an image of a 7 combined with the label 7. The objective is to maximize "goodness" (neural activity) in every layer.
- Negative pass (sleep): the network processes negative or hallucinated data, such as a hybrid image of a 7 and a 1, or an image with a wrong label. The objective is to minimize goodness.

**Key technical details.**

- Goodness function: typically the sum of squared neural activities (ReLU outputs) in a layer.
- Greedy layer-wise learning: each layer has its own objective and updates its weights immediately, independent of the layers above or below. This removes the need for a global error signal.
- Normalization: to stop activity from simply exploding to maximize goodness, the input vector to each layer is length-normalized. This forces the layer to learn from the orientation (spatial pattern) of the activity rather than its magnitude.
- Inference: for classification, the label is embedded into the input, for example a one-hot code in the corner. At inference the network runs one pass per candidate label and selects the label that accumulates the highest goodness score.

## Questions and concerns

**A. The negative-data problem.** How do we generate valid negative data for complex tasks? In the paper Hinton uses spatial masks to stitch together MNIST digits. Generating high-quality negative data (close to the real data manifold but clearly incorrect) is non-trivial for domains like NLP or video. If the negative data is too easy, such as white noise, the network learns nothing; if it is too hard, the network fails to converge.

**B. The greedy limitation.** Does greedy, layer-wise training limit the depth of learning? Because layer 1 optimizes its weights without feedback from layer 10, it may discard information that looks useless locally but is critical for high-level abstraction. This contrasts with backprop, which can credit-assign through depth. In effect, this turns a deep net into a stack of shallow nets. Early experiments show FF struggles to match backprop on datasets more complex than MNIST, such as CIFAR-10, without specific hacks.

**C. Inference efficiency.** Is FF actually slower than backprop? Running the forward pass once per class label scales poorly. For a 1000-class ImageNet task this would be prohibitively slow compared to a single softmax pass in standard networks.

**D. Biological plausibility vs. hacks.** Is layer normalization biologically plausible? FF relies heavily on normalizing activity vectors between layers to prevent goodness leakage. One view is that this is just as biologically suspect as backprop, since it requires a global calculation over the layer.

## Follow-up points and to-dos

**Conceptual and theoretical.**

- Read "Mortal Computation": Hinton's broader philosophy on why he wants algorithms that run on analog hardware where weights cannot be copied, which is the true use case for FF.
- Compare with predictive coding (PC): FF maximizes or minimizes goodness (energy), while PC typically minimizes prediction error.

**Experimental (coding projects).**

- Reproduce MNIST with a simple PyTorch implementation.
- Visualize the negative data: change the negative-generation method (random noise vs. permuted pixels) and observe how accuracy collapses. This shows the algorithm relies entirely on the quality of the hallucinations.
- The "sandwich" method: train the first 3 layers with FF as a feature extractor, freeze them, then train a standard linear classifier (softmax) on top with backprop. This gives O(1) inference while still using FF for feature learning.
- Permutation-invariance test: flatten MNIST images and shuffle the pixels, then train an FF network. It often performs surprisingly well compared to ConvNets, which shows that FF relies on global correlations rather than local geometry.

**Advanced reading.**

- The recurrent extension: if the greedy critique (point B) is a major concern, read the paper's section on Recurrent Forward-Forward. Hinton proposes treating a static image as a video sequence so later layers can send feedback to earlier layers over time, which in theory addresses the greedy limitation.
