/** @jsx h */
import h from "../../../shared/hyperscript";
import SlateTest from "@slate-legacy/slate-testing-library";

import Lists from "../src";

describe("unwrapList", () => {
  it("should unwrap a list", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>
              <cursor />
            </list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue(
      <paragraph>
        <cursor />
      </paragraph>
    );

    editor.unwrapList();

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should unwrap at the current item", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>Item</list_item_child>
          </list_item>
          <list_item>
            <list_item_child>
              <cursor />
            </list_item_child>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue([
      <unordered_list>
        <list_item>
          <list_item_child>Item</list_item_child>
        </list_item>
      </unordered_list>,
      <paragraph>
        <cursor />
      </paragraph>
    ]);

    editor.unwrapList();

    expect(editor.value).toMatchSlateValue(expected);
  });

  it("should handle nested lists", () => {
    const { editor, createValue } = SlateTest({ plugins: Lists() });

    editor.setValue(
      createValue(
        <unordered_list>
          <list_item>
            <list_item_child>Item</list_item_child>
          </list_item>
          <list_item>
            <list_item_child>
              <cursor />
            </list_item_child>
            <unordered_list>
              <list_item>
                <list_item_child>Sub Item</list_item_child>
              </list_item>
            </unordered_list>
          </list_item>
        </unordered_list>
      )
    );

    const expected = createValue([
      <unordered_list>
        <list_item>
          <list_item_child>Item</list_item_child>
        </list_item>
      </unordered_list>,
      <paragraph>
        <cursor />
      </paragraph>,
      <unordered_list>
        <list_item>
          <list_item_child>Sub Item</list_item_child>
        </list_item>
      </unordered_list>
    ]);

    editor.unwrapList();

    expect(editor.value).toMatchSlateValue(expected);
  });
});
