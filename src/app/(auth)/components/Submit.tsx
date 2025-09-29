import { Button } from "@/components/ui/button";
import * as React from "react";

export default function Submit({
  children,
  ...others
}: React.ComponentProps<typeof Button>) {
  return (
    <Button type="submit" {...others}>
      {children}
    </Button>
  );
}
