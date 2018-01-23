function PadLeft(Getint)
{
	var str = ""+Getint;
	var pad = "0000";
	var result = pad.substring(0, pad.length - str.length) + str;
	
	return result;
}