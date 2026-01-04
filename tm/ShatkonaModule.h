#pragma once

#include <jsi/jsi.h>
#include <ReactCommon/CallInvoker.h>
#include <memory>
#include "NativeShatkonaSpec.h"

namespace facebook::react {

class ShatkonaModule : public NativeShatkonaSpecJSI {
public:
  ShatkonaModule(std::shared_ptr<CallInvoker> jsInvoker);

  jsi::String getVersion(jsi::Runtime &rt);
  double getSIndex(jsi::Runtime &rt, jsi::Array rrIntervals);
};

} // namespace facebook::react