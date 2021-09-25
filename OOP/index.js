// 继承

// 原型链
// function SuperType() {
//     this.property = true;
// }

// SuperType.prototype.getSuperValue = function() {
//     return this.property;
// }

// function SubType() {
//     this.subProperty = false;
// }

// SubType.prototype = new SuperType();

// SubType.prototype.getSubValue = function() {
//     return this.subProperty;
// }

// let instance = new SubType();

// console.log(instance);
// console.log(instance.getSuperValue());

// // 缺点：
// // 1.原型中包含引用值属性，对该属性的修改，会反映到其他实例上；
// // 2.子类型在实例化时不能给父类的构造函数传参；

// 盗用构造函数（对象伪装/经典继承）
// function SuperType(name) {
//     this.name = name;
//     this.superValue = ['red', 'green'];
// }

// function SubType(name) {
//     SuperType.call(this, name);
// }

// let instance1 = new SubType('jack');
// instance1.superValue.push('black');
// let instance2 = new SubType('rose');

// console.log(instance1.name, instance1.superValue);
// console.log(instance2.name, instance2.superValue);

// // 缺点：
// // 1.必须在构造函数中定义方法，因此函数不能重用；
// // 2.子类也不能访问父类原型上定义的方法


// 组合继承


// 原型式继承


// 寄生式继承


// 寄生式组合继承