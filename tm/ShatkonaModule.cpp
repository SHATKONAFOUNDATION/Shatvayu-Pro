#include "ShatkonaModule.h"
#include <vector>
#include "../libs/eigen-5.0.0/Eigen/Dense"

namespace facebook::react {

ShatkonaModule::ShatkonaModule(std::shared_ptr<CallInvoker> jsInvoker)
    : NativeShatkonaSpecJSI(jsInvoker) {}

jsi::String ShatkonaModule::getVersion(jsi::Runtime &rt) {
    return jsi::String::createFromUtf8(rt, "Shatkona_Engine_V1.0_Eigen5");
}

double ShatkonaModule::getSIndex(jsi::Runtime &rt, jsi::Array rrIntervals) {
    // 1. Get size and handle edge case
    size_t length = rrIntervals.size(rt);
    if (length < 2) return 0.0;

    // 2. Initialize Eigen Vector with explicit cast to prevent index errors
    Eigen::VectorXd v(static_cast<int>(length));

    for (size_t i = 0; i < length; i++) {
        // getValueAtIndex returns a jsi::Value, we must convert to number
        v(static_cast<int>(i)) = rrIntervals.getValueAtIndex(rt, i).asNumber();
    }

    // 3. Shatkona Math Logic
    double meanRR = v.mean();
    double range = v.maxCoeff() - v.minCoeff();

    // Prevent division by zero
    if (range < 0.0001) return 0.0;

    // Baevsky Stress Index Formula
    double stressIndex = 1000000.0 / (2.0 * meanRR * range);

    return stressIndex;
}

} // namespace facebook::react