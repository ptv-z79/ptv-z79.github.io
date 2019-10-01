; хз что это такое, просто подсветка красивая!!! :)
anims_name_fix_1 proc
 	lea		eax, [esp+18h]
 	PRINT_UINT "** Loaded animation %s", eax
 	add     dword ptr [esp+10h], 1
 	jmp back_from_anims_name_fix_1
 anims_name_fix_1 endp
