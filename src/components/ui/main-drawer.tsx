import React, { memo, useState } from 'react'

import { buttonVariants } from './button'
import {
   Drawer,
   DrawerContent,
   DrawerDescription,
   DrawerHeader,
   DrawerTitle,
   DrawerTrigger,
} from './drawer'

const MainDrawer = ({
   btnLabel,
   title,
   desc,
   children,
   noBtn,
}: {
   btnLabel?: string
   title: string
   desc?: string
   children: React.ReactNode
   onOpenChange: () => void
   open: boolean
   noBtn?: boolean
}) => {
   const [openDrawer, setOpenDrawer] = useState(false)

   return (
      <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
         {!noBtn ? <DrawerTrigger className={buttonVariants()}>{btnLabel}</DrawerTrigger> : null}

         <DrawerContent>
            <DrawerHeader className="text-left">
               <DrawerTitle>{title}</DrawerTitle>
               {desc && desc.length && <DrawerDescription>{desc}</DrawerDescription>}
            </DrawerHeader>
            {children}
         </DrawerContent>
      </Drawer>
   )
}

export default memo(MainDrawer)
