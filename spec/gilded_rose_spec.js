describe("Gilded Rose", function () {
  const { Shop, Item } = require("../src/gilded_rose");

  it("full test", () => {
    const items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 2, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
      new Item("normal item", 5, 49),

      // This Conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6),
    ];

    const gildedRose = new Shop(items);

    const days = Number(process.argv[2]) || 2;
    for (let day = 0; day < days; day++) {
      gildedRose.updateQuality();
    }
  });

  it("should foo", function () {
    const gildedRose = new Shop([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should decrease sellIn by 1 for normal item", function () {
    const items = [new Item("Normal Item", 10, 20)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(9);
  });

  it("should decrease quality by 1 for normal item", function () {
    const items = [new Item("Normal Item", 10, 20)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(19);
  });

  it("should increase quality by 1 for Aged Brie", function () {
    const items = [new Item("Aged Brie", 2, 0)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("should decrease quality by 2 for normal item after sellIn date passed", function () {
    const items = [new Item("Normal Item", -1, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(8);
  });

  it("should never set quality below 0", function () {
    const items = [new Item("Normal Item", 10, 0)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should increase quality for Aged Brie even after sellIn date passed", function () {
    const items = [new Item("Aged Brie", -1, 10)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(12);
  });

  it("should never set quality above 50 for Aged Brie", function () {
    const items = [new Item("Aged Brie", 10, 50)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not decrease quality for Sulfuras", function () {
    const items = [new Item("Sulfuras, Hand of Ragnaros", 10, 80)];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it("should increase quality by 2 for Backstage passes when sellIn is 10 days or less", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 20),
    ];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(22);
  });

  it("should drop quality to 0 for Backstage passes after the concert", function () {
    const items = [
      new Item("Backstage passes to a TAFKAL80ETC concert", 0, 20),
    ];
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});
