"use client";

import {
  QueryClient,
  QueryClientProvider as Provider,
} from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [client] = useState(new QueryClient());
  return <Provider client={client}>{children}</Provider>;
};
