import * as DataListPrimitive from "@/primitives/data-list";

export default function RootPage() {
  return (
    <div>
      <h1>Hello world</h1>
      <DataListPrimitive.Root>
        <DataListPrimitive.Item>
          <DataListPrimitive.Label>Label</DataListPrimitive.Label>
          <DataListPrimitive.Value>Value</DataListPrimitive.Value>
        </DataListPrimitive.Item>
        <DataListPrimitive.Sub>
          <DataListPrimitive.SubTrigger>
            Trigger
            <DataListPrimitive.SubIndicator />
          </DataListPrimitive.SubTrigger>
          <DataListPrimitive.SubContent>Content</DataListPrimitive.SubContent>
        </DataListPrimitive.Sub>
      </DataListPrimitive.Root>
    </div>
  );
}
