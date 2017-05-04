# hypercalc

A multi-dimensional, headless JavaScript spreadsheet for the browser or Node.js.

1. Small: 19K Raw ES6, 10.5K Compressed ES6, 3K gzipped ES6, 130K Browserified, Transpiled, Compressed, GZipped (125K is mathjs).
2. One dependency, mathjs.

# functions

The below list covers approximately 60% of Hypercalc functionality. We have a lot to document .... bear with us.

<table>

<tr><th colspan='3' align='left'>Unary Numeric Functions</th></tr><tr><td>Name</td><td>Example</td><td>Result</td></tr>
    <tr><td>abs</td><td>=abs(3.5)</td><td>3.5</td></tr>
    <tr><td>acos</td><td>=acos(3.5)</td><td>{"mathjs":"Complex","re":0,"im":1.9248473002384139}</td></tr>
    <tr><td>acosh</td><td>=acosh(3.5)</td><td>1.9248473002384139</td></tr>
    <tr><td>acot</td><td>=acot(3.5)</td><td>0.27829965900511133</td></tr>
    <tr><td>acoth</td><td>=acoth(3.5)</td><td>0.29389333245105953</td></tr>
    <tr><td>acsc</td><td>=acsc(3.5)</td><td>0.28975170143604745</td></tr>
    <tr><td>acsch</td><td>=acsch(3.5)</td><td>0.28196323918998284</td></tr>
    <tr><td>asec</td><td>=asec(3.5)</td><td>1.2810446253588492</td></tr>
    <tr><td>asech</td><td>=asech(3.5)</td><td>{"mathjs":"Complex","re":1.1102230246251564e-16,"im":-1.2810446253588492}</td></tr>
    <tr><td>asin</td><td>=asin(3.5)</td><td>{"mathjs":"Complex","re":1.5707963267948966,"im":-1.9248473002384139}</td></tr>
    <tr><td>asinh</td><td>=asinh(3.5)</td><td>1.9657204716496515</td></tr>
    <tr><td>atan</td><td>=atan(3.5)</td><td>1.2924966677897853</td></tr>
    <tr><td>atanh</td><td>=atanh(3.5)</td><td>{"mathjs":"Complex","re":0.29389333245105953,"im":-1.5707963267948966}</td></tr>
    <tr><td>ceil</td><td>=ceil(3.5)</td><td>4</td></tr>
    <tr><td>cos</td><td>=cos(3.5)</td><td>-0.9364566872907963</td></tr>
    <tr><td>cosh</td><td>=cosh(3.5)</td><td>16.572824671057315</td></tr>
    <tr><td>cot</td><td>=cot(3.5)</td><td>2.669616484968866</td></tr>
    <tr><td>coth</td><td>=coth(3.5)</td><td>1.0018254285064434</td></tr>
    <tr><td>csc</td><td>=csc(3.5)</td><td>-2.850763437540464</td></tr>
    <tr><td>csch</td><td>=csch(3.5)</td><td>0.06044989000915611</td></tr>
    <tr><td>cube</td><td>=cube(3.5)</td><td>42.875</td></tr>
    <tr><td>factorial</td><td>=factorial(3.5)</td><td>11.631728396567446</td></tr>
    <tr><td>floor</td><td>=floor(3.5)</td><td>3</td></tr>
    <tr><td>gamma</td><td>=gamma(3.5)</td><td>3.3233509704478403</td></tr>
    <tr><td>isInteger</td><td>=isInteger(3.5)</td><td>false</td></tr>
    <tr><td>isNegative</td><td>=isNegative(3.5)</td><td>false</td></tr>
    <tr><td>isNumeric</td><td>=isNumeric(3.5)</td><td>true</td></tr>
    <tr><td>isPositive</td><td>=isPositive(3.5)</td><td>true</td></tr>
    <tr><td>isPrime</td><td>=isPrime(3.5)</td><td>true</td></tr>
    <tr><td>isZero</td><td>=isZero(3.5)</td><td>false</td></tr>
    <tr><td>isNaN</td><td>=isNaN(3.5)</td><td>false</td></tr>
    <tr><td>log10</td><td>=log10(3.5)</td><td>0.5440680443502757</td></tr>
    <tr><td>sec</td><td>=sec(3.5)</td><td>-1.0678550471918107</td></tr>
    <tr><td>sech</td><td>=sech(3.5)</td><td>0.06033974412016765</td></tr>
    <tr><td>sin</td><td>=sin(3.5)</td><td>-0.35078322768961984</td></tr>
    <tr><td>sinh</td><td>=sinh(3.5)</td><td>16.542627287634996</td></tr>
    <tr><td>sqrt</td><td>=sqrt(3.5)</td><td>1.8708286933869707</td></tr>
    <tr><td>square</td><td>=square(3.5)</td><td>12.25</td></tr>
    <tr><td>tan</td><td>=tan(3.5)</td><td>0.3745856401585947</td></tr>
    <tr><td>tanh</td><td>=tanh(3.5)</td><td>0.9981778976111987</td></tr>

  <tr><th colspan='3' align='left'>Multi Argument Numeric Functions</th></tr><tr><td>Name</td><td>Example</td><td>Result</td></tr>
    <tr><td>average</td><td>=average(0,1,2,3,3,4,5,6)</td><td>3</td></tr>
    <tr><td>max</td><td>=max(0,1,2,3,3,4,5,6)</td><td>6</td></tr>
    <tr><td>median</td><td>=median(0,1,2,3,3,4,5,6)</td><td>3</td></tr>
    <tr><td>min</td><td>=min(0,1,2,3,3,4,5,6)</td><td>0</td></tr>
    <tr><td>mode</td><td>=mode(0,1,2,3,3,4,5,6)</td><td>[3]</td></tr>
    <tr><td>product</td><td>=product(0,1,2,3,3,4,5,6)</td><td>0</td></tr>
    <tr><td>stdev</td><td>=stdev(0,1,2,3,3,4,5,6)</td><td>2</td></tr>
    <tr><td>sum</td><td>=sum(0,1,2,3,3,4,5,6)</td><td>24</td></tr>

  <tr><th colspan='3' align='left'>Constants</th></tr><tr><td>Name</td><td>Example</td><td>Result</td></tr>
    <tr><td>e</td><td>=e()</td><td>2.718281828459045</td></tr>
    <tr><td>i</td><td>=i()</td><td>{"mathjs":"Complex","re":0,"im":1}</td></tr>
    <tr><td>pi</td><td>=pi()</td><td>3.141592653589793</td></tr>
    <tr><td>ln2</td><td>=ln2()</td><td>0.6931471805599453</td></tr>
    <tr><td>ln10</td><td>=ln10()</td><td>2.302585092994046</td></tr>
    <tr><td>log2e</td><td>=log2e()</td><td>1.4426950408889634</td></tr>
    <tr><td>log10e</td><td>=log10e()</td><td>0.4342944819032518</td></tr>
    <tr><td>phi</td><td>=phi()</td><td>1.618033988749895</td></tr>
    <tr><td>tau</td><td>=tau()</td><td>6.283185307179586</td></tr>
    
</table>

# release history (reverse chronological order)

2017-05-04 v0.0.3 Started adding unit tests and documentation.

2017-05-03 v0.0.2 Cleaned-up directory structure, browserified.

2017-05-03 v0.0.1 Initial public release.
