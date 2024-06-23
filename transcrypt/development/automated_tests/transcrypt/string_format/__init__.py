
def run(autoTester):
    autoTester.check('Numbers:')

    autoTester.check('int: {:06d}'.format(18))
    autoTester.check('int: {:05}'.format(123))
    autoTester.check('int: {:2d}'.format(180))
    autoTester.check('int: {: 4d} {: 4d}'.format(75, -8))
    autoTester.check('int: {:<8d}'.format(55))
    autoTester.check('int: {:*>8d}'.format(55))
    autoTester.check('int: {:8,d}'.format(5555555))
    autoTester.check('bin: {:b}'.format(325))
    autoTester.check('bin: {:b}'.format(-15))
    autoTester.check('bin: {:010b}'.format(-15))
    autoTester.check('bin: {:#010b}'.format(-15))
    autoTester.check('oct: {:+010o}'.format(234))
    autoTester.check('oct: {:#o}'.format(234))
    autoTester.check('hex: {:+010x}'.format(234))
    autoTester.check('hex: {:X}'.format(-234))
    autoTester.check('hex: {:#10X}'.format(-234))
    autoTester.check('chr: {:010c}'.format(64))
    autoTester.check('float: {:f}'.format(-1554.1556565))
    autoTester.check('float: {:#f}'.format(-1553))
    autoTester.check('float: {:#.0f}'.format(-1552))
    autoTester.check('float: {:.2f}'.format(105.1528))
    autoTester.check('float: {:.8f}'.format(0.1528))
    autoTester.check('float: {:.2f}'.format(float('-inf')))
    # autoTester.check('float: {:f}'.format(float('inf') - float('inf')))  # transcrypt bug, must return NaN instead of ValueError
    autoTester.check('float: {:f}'.format(float('nan')))
    autoTester.check('pct: {:.4%}'.format(1 / 3))
    autoTester.check('exp: {:e}'.format(-17.845265568))
    autoTester.check('exp: {:#e}'.format(-17.))
    autoTester.check('exp: {:015.4e}'.format(17.845265568))
    autoTester.check('exp: {:E}'.format(165665564654686.123))
    autoTester.check('gen: {:g}'.format(165665564654686.123))
    autoTester.check('gen: {:g}'.format(1656))
    autoTester.check('gen: {:g}'.format(1.123485574))
    autoTester.check('gen: {:.8g}'.format(148560.123485574))
    autoTester.check('gen: {:.4}'.format(1485.1))
    autoTester.check('gen: {}'.format(1485.1))
    autoTester.check('gen: {:.8}'.format(1485.1))
    autoTester.check('gen: {:.8g}'.format(1485.1))

    autoTester.check('Strings:')

    autoTester.check('str: {:20s}'.format('abc'))
    autoTester.check('str: {:*>10}'.format('abc'))
    autoTester.check('{1}{0}{1}'.format('kad', 'abra'))
    autoTester.check('{1}{0!r}{1}'.format('kad', 'abra'))
    autoTester.check('{} and {}'.format('dog', 'cat'))
    autoTester.check('{:*^13}'.format('centered'))

    a = [15.846, 16.7856, 18.8563]

    class B:
        def __repr__(self):
            return self.prop

        def __format__(self, fmt_spec):
            return fmt_spec + ' ' + self.prop

    b = B()
    b.prop = 'object attribute'
    c = {
        'somekey': 'key value'
    }
    autoTester.check('{a[1]:.2f} {d} {b.prop} {c[somekey]}'.format(a=a, b=b, c=c, d='test'))

    autoTester.check('Other:')

    autoTester.check('{}'.format(True))
    autoTester.check('{:*>10}'.format(True))
    autoTester.check('{!r:*^20}'.format(b))
    autoTester.check('{:custom_format}'.format(b))
    autoTester.check('{}'.format(a))
    autoTester.check('{}'.format(c))
